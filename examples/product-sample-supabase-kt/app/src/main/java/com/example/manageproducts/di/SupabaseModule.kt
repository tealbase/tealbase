package com.example.manageproducts.di

import com.example.manageproducts.BuildConfig
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import io.github.jan.tealbase.annotiations.TealbaseExperimental
import dagger.hilt.components.SingletonComponent
import io.github.jan.tealbase.TealbaseClient
import io.github.jan.tealbase.gotrue.FlowType
import io.github.jan.tealbase.createTealbaseClient
import io.github.jan.tealbase.gotrue.GoTrue
import io.github.jan.tealbase.gotrue.gotrue
import io.github.jan.tealbase.postgrest.Postgrest
import io.github.jan.tealbase.postgrest.postgrest
import io.github.jan.tealbase.storage.Storage
import io.github.jan.tealbase.storage.storage
import javax.inject.Singleton


@InstallIn(SingletonComponent::class)
@Module
object TealbaseModule {
    
    @OptIn(TealbaseExperimental::class)
    @Provides
    @Singleton
    fun provideTealbaseClient(): TealbaseClient {
        return createTealbaseClient(
            tealbaseUrl = BuildConfig.TEALBASE_URL,
            tealbaseKey = BuildConfig.API_KEY
        ) {
            install(Postgrest)
            install(GoTrue) {
                flowType = FlowType.PKCE
                scheme = "app"
                host = "tealbase.com"
            }
            install(Storage)
        }
    }

    @Provides
    @Singleton
    fun provideTealbaseDatabase(client: TealbaseClient): Postgrest {
        return client.postgrest
    }

    @Provides
    @Singleton
    fun provideTealbaseGoTrue(client: TealbaseClient): GoTrue {
        return client.gotrue
    }


    @Provides
    @Singleton
    fun provideTealbaseStorage(client: TealbaseClient): Storage {
        return client.storage
    }

}