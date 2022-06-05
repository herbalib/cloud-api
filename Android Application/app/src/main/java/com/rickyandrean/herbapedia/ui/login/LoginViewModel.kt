package com.rickyandrean.herbapedia.ui.login

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.rickyandrean.herbapedia.model.LoginRequest
import com.rickyandrean.herbapedia.model.LoginResponse
import com.rickyandrean.herbapedia.network.ApiConfig
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginViewModel: ViewModel() {
    private val _loading = MutableLiveData<Boolean>()
    val loading: LiveData<Boolean> = _loading

    init {
        _loading.value = false
    }

    fun login(email: String, password: String) {
        _loading.value = true

        val client = ApiConfig.getApiService().login("application/json", LoginRequest(email, password))
        client.enqueue(object: Callback<LoginResponse> {
            override fun onResponse(call: Call<LoginResponse>, response: Response<LoginResponse>) {
                _loading.value = false

                if (response.isSuccessful) {
                    Log.d(TAG, response.body()!!.success)
                } else {
                    Log.d(TAG, response.body()!!.error)
                }
            }

            override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                _loading.value = false
                Log.e(TAG, t.message.toString())
            }
        })
    }

    companion object {
        private const val TAG = "LoginViewModel"
    }
}