package com.someapp.RestartAppModule

import android.app.Activity
import android.os.Handler
import android.os.Looper
import com.facebook.react.ReactApplication
import com.facebook.react.ReactInstanceManager
import com.facebook.react.bridge.*

class RestartModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private var mLifecycleEventListener: LifecycleEventListener? = null

    private fun loadBundleLegacy() {
        val currentActivity = currentActivity ?: return
        currentActivity.runOnUiThread {
            currentActivity.recreate()
        }
    }

    private fun loadBundle() {
        clearLifecycleEventListener()
        try {
            val instanceManager = resolveInstanceManager() ?: return
            Handler(Looper.getMainLooper()).post {
                try {
                    instanceManager.recreateReactContextInBackground()
                } catch (t: Throwable) {
                    loadBundleLegacy()
                }
            }
        } catch (t: Throwable) {
            loadBundleLegacy()
        }
    }

    private fun resolveInstanceManager(): ReactInstanceManager? {
        var instanceManager = getReactInstanceManager()
        if (instanceManager != null) {
            return instanceManager
        }
        
        val currentActivity = currentActivity ?: return null
        val reactApplication = currentActivity.application as ReactApplication
        instanceManager = reactApplication.reactNativeHost.reactInstanceManager
        return instanceManager
    }

    private fun clearLifecycleEventListener() {
        mLifecycleEventListener?.let {
            reactApplicationContext.removeLifecycleEventListener(it)
            mLifecycleEventListener = null
        }
    }

    @ReactMethod
    fun restart(reason: String) {
        restartReason = reason
        loadBundle()
    }

    @ReactMethod
    fun getReason(promise: Promise) {
        try {
            promise.resolve(restartReason)
        } catch (e: Exception) {
            promise.reject("Create Event Error", e)
        }
    }

    override fun getName(): String = "RNRestart"

    companion object {
        private var restartReason: String? = null
        private var mReactInstanceHolder: ReactInstanceHolder? = null

        fun getReactInstanceManager(): ReactInstanceManager? {
            return mReactInstanceHolder?.reactInstanceManager
        }
    }
}