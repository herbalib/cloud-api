package com.rickyandrean.herbapedia.ui.onboarding

import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.asLiveData
import com.rickyandrean.herbapedia.model.Authentication
import com.rickyandrean.herbapedia.storage.AuthenticationPreference

class OnboardingViewModel(private val preference: AuthenticationPreference): ViewModel() {
    fun getAuthentication(): LiveData<Authentication> {
        return preference.getAuthentication().asLiveData()
    }
}