import { View, Image } from 'react-native';
import React from 'react';
import { kolors } from '@/constants/Colors';
import { avatarImageUrl } from '@/util/resources';

interface _Props_ {
    size?: number, 
    borderRadius?: number, 
    fullName: string
};

const UserProfileImage:React.FC<_Props_> = ({ 
    fullName, size = 55, borderRadius
}) => {

    return (
        <View style={{
            // width: "100%",
            // height: 32,
            padding: 1,
            // borderRadius: 50,
            overflow: "hidden",
            // backgroundColor: kolors.theme.light,
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Image
                style={{
                    width: size,
                    height: size,
                    borderRadius: borderRadius ? borderRadius : size,
                    backgroundColor: kolors.theme.light,
                }}
                source={{
                    uri: avatarImageUrl(size, fullName)
                }}
            />
        </View>
    )
}

export default UserProfileImage;