import {Flex, Text} from "@radix-ui/themes";
import {useNavigate} from "react-router-dom";
import './header.css'

export default function Header() {
    const navigate = useNavigate()

    return (
        <header>
            <Flex justify="between" align="center" px="4" className='header-flex'>
                <Text title='Gå til hjemmeside' weight="bold" size='8' className='logo font-orbitron'
                      onClick={() => navigate('/')}>
                    Fritjof
                </Text>
            </Flex>
        </header>
    )

}
