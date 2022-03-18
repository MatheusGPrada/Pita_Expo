import { loadAsync } from 'expo-font'

export const loadFonts = async () => {
    try {
        await loadAsync({
            'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
            'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
        })
        return
    } catch (error) {
        console.debug('error', error)
    }
}
