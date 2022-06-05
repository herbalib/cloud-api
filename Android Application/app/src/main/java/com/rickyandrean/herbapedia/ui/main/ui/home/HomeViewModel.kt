package com.rickyandrean.herbapedia.ui.main.ui.home

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.rickyandrean.herbapedia.model.LoginRequest
import com.rickyandrean.herbapedia.model.PlantResponse
import com.rickyandrean.herbapedia.network.ApiConfig
import com.rickyandrean.herbapedia.ui.main.MainActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class HomeViewModel : ViewModel() {
    private val _loading = MutableLiveData<Boolean>()
    private val _plant = MutableLiveData<Boolean>()
    val loading: LiveData<Boolean> = _loading
    val plant: LiveData<Boolean> = _plant

    init {
        loadPlant()
    }

    private fun loadPlant(){
        // Log.d(TAG,"Bearer ${MainActivity.token}")

        val client = ApiConfig.getApiService().plants("application/json", "Bearer ${MainActivity.token}")
        client.enqueue(object: Callback<PlantResponse> {
            override fun onResponse(call: Call<PlantResponse>, response: Response<PlantResponse>) {
                val responseBody = response.body()!!

                if (response.isSuccessful) {
                    if (responseBody.error == "") {
                        Log.d(TAG, response.body()!!.toString())
                    } else {
                        Log.d(TAG, responseBody.error.toString())
                    }
                } else {
                    Log.d(TAG, "Error occured!")
                }
            }

            override fun onFailure(call: Call<PlantResponse>, t: Throwable) {
                Log.e(TAG, "Error occured!")
            }
        })
    }

    companion object {
        private const val TAG = "HomeViewModel"
    }
}