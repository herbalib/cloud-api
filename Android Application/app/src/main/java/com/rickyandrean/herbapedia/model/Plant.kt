package com.rickyandrean.herbapedia.model

import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
data class Plant (
    val image: String,
    val name: String,
    val latin: String,
    val nutrient: String,
    val cure: String,
    val description: String
): Parcelable