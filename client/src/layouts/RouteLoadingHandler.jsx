import { useUI } from "@/hooks/useUI"
import { useEffect } from "react"
import { useNavigation } from "react-router-dom"

const RouteLoadingHandler = () => {
    const navigation = useNavigation()
    const { setLoading } = useUI()

    useEffect(() => {
        setLoading(navigation.state === "loading")
    }, [navigation.state])

    return null
}

export default RouteLoadingHandler