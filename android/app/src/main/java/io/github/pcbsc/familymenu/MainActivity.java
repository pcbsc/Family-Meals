package io.github.pcbsc.familymenu;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Our own plugin (not from npm) has to be registered before the bridge starts.
        registerPlugin(SharedTextPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
