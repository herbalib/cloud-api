package com.rickyandrean.herbapedia.ui.main.ui.home

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.core.view.ViewCompat
import androidx.fragment.app.Fragment
import androidx.fragment.app.commit
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.FragmentNavigatorExtras
import androidx.navigation.fragment.findNavController
import com.rickyandrean.herbapedia.R
import com.rickyandrean.herbapedia.databinding.FragmentHomeBinding
import com.rickyandrean.herbapedia.ui.main.ui.plants.PlantsFragment

class HomeFragment : Fragment(), View.OnFocusChangeListener {
    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val homeViewModel = ViewModelProvider(this).get(HomeViewModel::class.java)
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.textInputSearch.onFocusChangeListener = this
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    override fun onFocusChange(v: View?, p1: Boolean) {
        if (v?.id == R.id.text_input_search) {
            binding.textInputSearch.onFocusChangeListener = null

            val extras = FragmentNavigatorExtras(binding.cvHome to "plants", binding.cvSearch to "search", binding.cvScan to "scan")
            findNavController().navigate(
                R.id.action_navigation_home_to_navigation_plants,
                null,
                null,
                extras
            )

//            val fragment = PlantsFragment()
//            parentFragmentManager.commit {
//                addSharedElement(binding.cvHome, "plants")
//                addSharedElement(binding.cvSearch, "search")
//                addSharedElement(binding.cvScan, "scan")
//                replace(R.id.nav_host_fragment_activity_main, fragment)
//                addToBackStack(null)
//            }
        }
    }
}