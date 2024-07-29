
import type { FC, ReactNode } from "react";
import { View } from "react-native";
import { SafeScreenStyles as styles } from './style';

interface SafeScreenProps {
    children: ReactNode
}

export const SafeScreen: FC<SafeScreenProps> = ({ children }) => {
    return (
        <View style={styles.screen}>
            {children}
        </View>
    )
}