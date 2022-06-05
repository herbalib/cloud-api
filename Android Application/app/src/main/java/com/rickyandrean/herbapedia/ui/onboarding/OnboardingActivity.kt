package com.rickyandrean.herbapedia.ui.onboarding

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.WindowManager
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityOptionsCompat
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.preferencesDataStore
import androidx.lifecycle.ViewModelProvider
import com.rickyandrean.herbapedia.databinding.ActivityOnboardingBinding
import com.rickyandrean.herbapedia.helper.ViewModelFactory
import com.rickyandrean.herbapedia.storage.AuthenticationPreference
import com.rickyandrean.herbapedia.ui.login.LoginActivity
import com.rickyandrean.herbapedia.ui.main.MainActivity
import com.rickyandrean.herbapedia.ui.register.RegisterActivity

private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "authentication")

class OnboardingActivity : AppCompatActivity() {
    private lateinit var binding: ActivityOnboardingBinding
    private lateinit var onboardingViewModel: OnboardingViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityOnboardingBinding.inflate(layoutInflater)
        setContentView(binding.root)

        onboardingViewModel = ViewModelProvider(
            this@OnboardingActivity,
            ViewModelFactory.getInstance(AuthenticationPreference.getInstance(dataStore))
        )[OnboardingViewModel::class.java]

        setupView()

        onboardingViewModel.getAuthentication().observe(this) {
            if (it.token != "") {
                startActivity(Intent(this, MainActivity::class.java))
                finish()
            }
        }

        binding.btnLogin.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java), ActivityOptionsCompat.makeSceneTransitionAnimation(this).toBundle())
        }

        binding.btnRegister.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java), ActivityOptionsCompat.makeSceneTransitionAnimation(this).toBundle())
        }
    }

    private fun setupView() {
        supportActionBar?.hide()

        // hide bottom navigation bar
        window.setFlags(
            WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
            WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS
        )
    }
}