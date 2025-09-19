import {Flex, Text} from "@radix-ui/themes";
import './homepage.css'

export default function HomePage() {
    return (
        <Flex direction="column" align="center" justify="center" gap="4" mt='8'>
            <UserProfile/>
        </Flex>
    )

}

function UserProfile() {
    return (
        <Flex direction="column" align="center" justify="center" gap="4">
            <Text size="8" weight="bold">
                Brede Fritjof Klausen
            </Text>
            <img src={require('../../assets/profile.webp')} alt="Profile" className='profile-image'/>
        </Flex>
    )
}
