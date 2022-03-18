import React, { useEffect, useState } from 'react'
import { MainStack } from './src/routes/MainStack'
import { loadAsync } from 'expo-font'

export default function App() {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const loadApp = async () => {
            await loadAsync({
                'Montserrat-Regular': require('./src/assets/fonts/Montserrat-Regular.ttf'),
                'Montserrat-SemiBold': require('./src/assets/fonts/Montserrat-SemiBold.ttf'),
            })
            setIsLoaded(true)
        }
        loadApp()
    }, [])

    return <>{isLoaded && <MainStack />}</>
}
