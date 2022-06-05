package com.rickyandrean.herbapedia.network

import com.rickyandrean.herbapedia.model.*
import retrofit2.Call
import retrofit2.http.*


interface ApiService {
    @POST("auth/login")
    fun login(
        @Header("Content-Type") type: String,
        @Body loginRequest: LoginRequest
    ): Call<LoginResponse>

    @POST("auth/register")
    fun register(
        @Header("Content-Type") type: String,
        @Body registerRequest: RegisterRequest
    ): Call<RegisterResponse>

    @GET("plants")
    fun plants(
        @Header("Content-Type") type: String,
        @Header("Authorization") token: String
    ): Call<PlantResponse>
}