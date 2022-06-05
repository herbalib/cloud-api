package com.rickyandrean.herbapedia.model

import com.google.gson.annotations.SerializedName

data class PlantResponse(
	@field:SerializedName("error")
	val error: String? = null,

	@field:SerializedName("success")
	val success: String? = null,

	@field:SerializedName("plants")
	val plants: List<PlantsItem?>? = null
)

data class PlantsItem(
	@field:SerializedName("id")
	val id: Int? = null,

	@field:SerializedName("name")
	val name: String? = null,

	@field:SerializedName("latin_name")
	val latinName: String? = null,

	@field:SerializedName("description")
	val description: String? = null,

	@field:SerializedName("consumption")
	val consumption: String? = null,

	@field:SerializedName("image")
	val image: String? = null,

	@field:SerializedName("ref")
	val ref: String? = null,

	@field:SerializedName("benefits")
	val benefits: List<BenefitsItem?>? = null,

	@field:SerializedName("nutritions")
	val nutritions: List<NutritionsItem?>? = null,

	@field:SerializedName("locations")
	val locations: List<LocationsItem?>? = null
)

data class BenefitsItem(
	@field:SerializedName("id")
	val id: Int? = null,

	@field:SerializedName("name")
	val name: String? = null,

	@field:SerializedName("plant_id")
	val plantId: Int? = null,
)

data class NutritionsItem(
	@field:SerializedName("id")
	val id: Int? = null,

	@field:SerializedName("name")
	val name: String? = null,

	@field:SerializedName("plant_id")
	val plantId: Int? = null
)

data class LocationsItem(
	@field:SerializedName("id")
	val id: Int? = null,

	@field:SerializedName("lat")
	val lat: Double? = null,

	@field:SerializedName("long")
	val long: Double? = null,

	@field:SerializedName("description")
	val description: String? = null,

	@field:SerializedName("plant_id")
	val plant_id: Int? = null
)


