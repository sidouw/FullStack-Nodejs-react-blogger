import React,{useState,useContext} from 'react'
import {Link} from 'react-router-dom'
import UserProvider from '../Context/context'
import { ReactComponent as MenuIcon } from '../icons/menu.svg';


const Links = [
    {   
        name : 'Home',
        Path : '/'
    },
    {   
        name : 'Blogs',
        Path : '/Blogs'
    },
    {   
        name : 'About Us',
        Path : '/AboutUs'
    },
]

const DropDownMenu = ({onmouseLeave,isOpen})=>{
    const {user} = useContext(UserProvider.context)
    return (

        <div  onMouseLeave ={onmouseLeave} className = {' drop-down-menu'+(isOpen? ' active' : '')}>
            <ul className = 'drop-down-menu__items'>
            
               { user.author==="true" && <li className = 'drop-down-menu__item' >
                            <Link to='/create'>Create Post</Link>
                    </li>}
                <li className = 'drop-down-menu__item' >
                            <Link to='/Profile'>Profile</Link>
                    </li>

                <li className = 'drop-down-menu__item' >
                            <a href='/auth/logout'>Logout</a>
                    </li>

            </ul>
        </div>
    )
}

const ProfileSnipet = ({user})=>{
    const [isOpen,setIsOpen]= useState(false)
    return(
        <div className = 'header__profile-snipet'>
            <span  className = 'header__profile-snipet__btn' onClick= {()=>setIsOpen(!isOpen)}>
                <img alt ={'Post'} src = {user.picture}/>
                <span className = 'header__profile-snipet__name'>{user.username}</span>
            </span>

            <DropDownMenu onmouseLeave={()=>setIsOpen(!isOpen)} isOpen={isOpen}/>

        </div>
    )
}

const Navigation = ({onmouseLeave,isOpen})=>{
    return (
            <ul  onMouseLeave ={onmouseLeave} className = {'header__links'+(isOpen? ' active' : '')}>
                    {
                        Links.map((l,index)=>{
                        return (<li key= {index}>
                                    <Link className = 'header__links__link'  to={l.Path}>{l.name}</Link>
                                        </li>
                                        )
                        })
                    }
            </ul>
            )
}

const Header = ()=>{
    const {user} = useContext(UserProvider.context)
    const [isOpen,setIsOpen] = useState(false)
    return (
    <nav className = 'header'>
        <MenuIcon className = 'header__menu' onClick={()=>setIsOpen(!isOpen)}/>
        <span className = 'header__title'>Blogger</span>
        <Navigation onmouseLeave= {()=>isOpen && setIsOpen(!isOpen)} isOpen={isOpen}/>
            {
                user ?
                <ProfileSnipet user={user}/>
                :
                <a className = 'header__btn' href = '/auth/login'> Login with Google </a>
            }
        
    </nav>

)}
export default Header