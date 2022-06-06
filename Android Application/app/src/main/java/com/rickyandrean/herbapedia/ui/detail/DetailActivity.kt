package com.rickyandrean.herbapedia.ui.detail

import android.Manifest
import android.annotation.SuppressLint
import android.content.Context
import android.content.pm.PackageManager
import android.location.Location
import android.location.LocationManager
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.WindowInsets
import android.view.WindowManager
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.bumptech.glide.Glide
import com.bumptech.glide.load.resource.bitmap.CenterInside
import com.bumptech.glide.load.resource.bitmap.RoundedCorners
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import com.rickyandrean.herbapedia.R
import com.rickyandrean.herbapedia.databinding.ActivityDetailBinding
import com.rickyandrean.herbapedia.model.PlantsItem

class DetailActivity : AppCompatActivity(), OnMapReadyCallback {
    private lateinit var mMap: GoogleMap
    private lateinit var binding: ActivityDetailBinding
    private val detailViewModel: DetailViewModel by viewModels()

    @SuppressLint("MissingPermission")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupView()

        detailViewModel.loadPlant(intent.getIntExtra(ID, 0))
        detailViewModel.plant.observe(this) {
            updateScreen(it.plants[0])

            val mapFragment = supportFragmentManager.findFragmentById(R.id.map_detail) as SupportMapFragment
            mapFragment.getMapAsync(this)
        }
    }

    private fun setupView() {
        @Suppress("DEPRECATION")
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            window.insetsController?.hide(WindowInsets.Type.statusBars())
        } else {
            window.setFlags(
                WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN
            )
        }
        supportActionBar?.hide()
    }

    private fun updateScreen(plant: PlantsItem) {
        with(binding.bottomSheetPlant) {
            tvBsPlantName.text = plant.name
            tvBsPlantLatin.text = plant.latinName
            Glide.with(this@DetailActivity)
                .load(plant.image)
                .transform(CenterInside(), RoundedCorners(16))
                .into(ivBsPlantImage)

            tvBsPlantDescription.text = plant.description

            var nutrition = "-"
            if (plant.nutritions.isNotEmpty()) {
                nutrition = "${plant.nutritions[0].name} \n"

                if (plant.nutritions.size > 1) {
                    nutrition += plant.nutritions[1].name
                }
            }
            tvBsPlantNutrientContent.text = nutrition

            var cure = "-"
            if (plant.benefits.isNotEmpty()) {
                cure = "${plant.benefits[0].name} \n"

                if (plant.benefits.size > 1) {
                    cure += plant.benefits[1].name
                }
            }
            tvBsPlantCureContent.text = cure

            tvBsPlantProcessContent.text = plant.consumption
        }
    }

    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap

        with(mMap.uiSettings) {
            isZoomControlsEnabled = true
            isCompassEnabled = true
            isMapToolbarEnabled = true
        }

        if (detailViewModel.plant.value != null) {
            val plant = detailViewModel.plant.value!!.plants[0]

            plant.locations?.forEachIndexed { index, plt ->
                if (plt?.lat != null && plt.lon != null) {
                    val coordinate = LatLng(plt.lat.toDouble(), plt.lon.toDouble())
                    mMap.addMarker(
                        MarkerOptions()
                            .position(coordinate)
                            //.title(story.name)
                            .alpha(0.3F)
                            //.snippet(story.description)
                    )?.tag = index

                    if (index == plant.locations.size - 1) {
                        mMap.animateCamera(CameraUpdateFactory.newLatLngZoom(coordinate, 15f))
                    }
                }
            }
        }
    }

    companion object {
        const val ID = "id"
    }
}