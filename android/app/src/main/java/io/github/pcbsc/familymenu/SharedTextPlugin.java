package io.github.pcbsc.familymenu;

import android.content.Intent;
import android.net.Uri;
import android.util.Base64;
import androidx.core.content.IntentCompat;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;

/**
 * Hands things shared from other apps (Android's Share menu: an Instagram or
 * TikTok post, a link, a screenshot) to the web app, which imports the recipe.
 * The one that opened the app waits for take(); later ones arrive as "shared" events.
 */
@CapacitorPlugin(name = "SharedText")
public class SharedTextPlugin extends Plugin {

    private static final int MAX_IMAGE_BYTES = 15 * 1024 * 1024;
    private JSObject pending;

    @Override
    public void load() {
        pending = read(getActivity().getIntent());
        // So turning the phone or coming back to the app doesn't import it twice.
        if (pending != null) getActivity().setIntent(new Intent(Intent.ACTION_MAIN));
    }

    @Override
    protected void handleOnNewIntent(Intent intent) {
        super.handleOnNewIntent(intent);
        JSObject item = read(intent);
        if (item == null) return;
        if (hasListeners("shared")) notifyListeners("shared", item);
        else pending = item;
    }

    @PluginMethod
    public void take(PluginCall call) {
        JSObject out = pending != null ? pending : new JSObject();
        pending = null;
        call.resolve(out);
    }

    private JSObject read(Intent intent) {
        if (intent == null || !Intent.ACTION_SEND.equals(intent.getAction())) return null;
        JSObject item = new JSObject();
        String text = intent.getStringExtra(Intent.EXTRA_TEXT);
        String subject = intent.getStringExtra(Intent.EXTRA_SUBJECT);
        if (text != null) item.put("text", text);
        if (subject != null) item.put("title", subject);
        String type = intent.getType();
        if (type != null && type.startsWith("image/")) {
            Uri uri = IntentCompat.getParcelableExtra(intent, Intent.EXTRA_STREAM, Uri.class);
            String image = uri == null ? null : readBase64(uri);
            if (image != null) {
                item.put("image", image);
                item.put("imageType", type);
            }
        }
        return item.length() > 0 ? item : null;
    }

    private String readBase64(Uri uri) {
        try (InputStream in = getContext().getContentResolver().openInputStream(uri)) {
            if (in == null) return null;
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            byte[] buf = new byte[64 * 1024];
            int n;
            while ((n = in.read(buf)) > 0) {
                out.write(buf, 0, n);
                if (out.size() > MAX_IMAGE_BYTES) return null;
            }
            return Base64.encodeToString(out.toByteArray(), Base64.NO_WRAP);
        } catch (Exception e) {
            return null;
        }
    }
}
