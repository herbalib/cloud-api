package com.rickyandrean.herbapedia.ui.onboarding

import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.view.View
import android.view.WindowInsets
import android.view.WindowManager
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityOptionsCompat
import com.rickyandrean.herbapedia.databinding.ActivityOnboardingBinding
import com.rickyandrean.herbapedia.ui.login.LoginActivity
import com.rickyandrean.herbapedia.ui.register.RegisterActivity

class OnboardingActivity : AppCompatActivity() {
    private lateinit var binding: ActivityOnboardingBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityOnboardingBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupView()

        binding.btnLogin.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java), ActivityOptionsCompat.makeSceneTransitionAnimation(this).toBundle())
        }

        binding.btnRegister.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java), ActivityOptionsCompat.makeSceneTransitionAnimation(this).toBundle())
        }
    }

    private fun setupView() {
//        @Suppress("DEPRECATION")
//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
//            window.insetsController?.hide(WindowInsets.Type.statusBars())
//        } else {
//            window.setFlags(
//                WindowManager.LayoutParams.FLAG_FULLSCREEN,
//                WindowManager.LayoutParams.FLAG_FULLSCREEN
//            )
//        }
        supportActionBar?.hide()

        // hide bottom navigation bar
        window.setFlags(
            WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
            WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS
        )
    }
}