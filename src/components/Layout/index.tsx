
import type { FC, ReactNode } from "react";
import { StatusBar, View } from 'react-native'

interface SafeScreenProps {
    children: ReactNode
}

export const Layout: FC<SafeScreenProps> = ({ children }) => {
    return (
        <View className="flex-1 bg-[#071042]">
            <StatusBar backgroundColor="#fff" barStyle="light-content" />
            {children}
        </View>
    )
}