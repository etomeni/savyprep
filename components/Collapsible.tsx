import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import AppText from '@/components/custom/AppText';
import { kolors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

export function Collapsible({ 
  children, title, 
  titleStyles = {
    fontSize: 18,
    fontWeight: '700',
    color: kolors.theme.dark
  }
}: PropsWithChildren & { title: string, titleStyles?: TextStyle }) {
  const [isOpen, setIsOpen] = useState(false);
  // const theme = useColorScheme() ?? 'light';

  return (
    <View>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          // color={theme === 'light' ? kolors.light.icon : kolors.dark.icon}
          color={kolors.light.icon}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />

        <AppText style={titleStyles}>{title}</AppText>
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
	title: {
		fontSize: 18,
		fontWeight: '700',
		color: kolors.theme.dark
	},
});
