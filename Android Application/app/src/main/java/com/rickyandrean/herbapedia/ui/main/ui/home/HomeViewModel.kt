package com.rickyandrean.herbapedia.ui.main.ui.home

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.rickyandrean.herbapedia.model.LoginRequest
import com.rickyandrean.herbapedia.network.ApiConfig
import com.rickyandrean.herbapedia.ui.main.MainActivity

class HomeViewModel : ViewModel() {
    private val _loading = MutableLiveData<Boolean>()
    private val _plant = MutableLiveData<Boolean>()
    val loading: LiveData<Boolean> = _loading
    val plant: LiveData<Boolean> = _plant

    init {
        loadPlant()
    }

    private fun loadPlant(){
        // val client = ApiConfig.getApiService().plants("application/json", "Bearer ${MainActivity.token}")
        Log.d(TAG,"Bearer ${MainActivity.token}")
    }

    companion object {
        private const val TAG = "HomeViewModel"
    }
}