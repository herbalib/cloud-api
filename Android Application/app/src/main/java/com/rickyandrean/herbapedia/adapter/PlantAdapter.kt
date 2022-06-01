package com.rickyandrean.herbapedia.adapter

import android.content.Intent
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.rickyandrean.herbapedia.databinding.ItemPlantBinding
import com.rickyandrean.herbapedia.model.Plant
import com.rickyandrean.herbapedia.ui.detail.DetailActivity

class PlantAdapter(private val listPlant: ArrayList<Plant>): RecyclerView.Adapter<PlantAdapter.PlantViewHolder>() {
    class PlantViewHolder(var binding: ItemPlantBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(plant: Plant) {
            binding.tvPlantName.text = plant.name
            binding.tvPlantLatin.text = plant.latin
            binding.tvNutrientContent.text = plant.nutrient
            binding.tvCureContent.text = plant.cure

            binding.btnReadMore.setOnClickListener {
                val intent = Intent(itemView.context, DetailActivity::class.java)
                intent.putExtra(DetailActivity.PLANT, plant)
                itemView.context.startActivity(intent)
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PlantViewHolder {
        val binding = ItemPlantBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return PlantViewHolder(binding)
    }

    override fun onBindViewHolder(holder: PlantViewHolder, position: Int) {
        holder.bind(listPlant[position])
    }

    override fun getItemCount(): Int = listPlant.size
}