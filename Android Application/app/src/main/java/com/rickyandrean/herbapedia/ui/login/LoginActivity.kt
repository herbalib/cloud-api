package com.rickyandrean.herbapedia.ui.login

import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.view.WindowInsets
import android.view.WindowManager
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityOptionsCompat
import com.rickyandrean.herbapedia.databinding.ActivityLoginBinding
import com.rickyandrean.herbapedia.ui.main.MainActivity
import com.rickyandrean.herbapedia.ui.onboarding.OnboardingActivity
import com.rickyandrean.herbapedia.ui.register.RegisterActivity


class LoginActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupView()

        binding.fabBack.setOnClickListener {
            val intent = Intent(this, OnboardingActivity::class.java)
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
            startActivity(intent, ActivityOptionsCompat.makeSceneTransitionAnimation(this).toBundle())
            finish()
        }

        binding.tvRegister.setOnClickListener {
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent, ActivityOptionsCompat.makeSceneTransitionAnimation(this).toBundle())
            finish()
        }

        binding.btnLogin.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
            startActivity(intent)
            finish()
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