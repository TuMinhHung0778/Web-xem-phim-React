import Image from 'next/image'
import { useState,useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AnimationContext } from '../context/Animation'
import { CaretDownOutlined, DesktopOutlined, DribbbleOutlined, HomeOutlined, MenuOutlined, SearchOutlined, SlackOutlined } from '@ant-design/icons'
import { ProfileContext } from '../context/profile'
function Navbar() {

    //global State
    const {showAnimation,handleAnimation} = useContext(AnimationContext)
    const {profile,Logout} = useContext(ProfileContext)


    //loacl state
    const [openMenu,setOpenMenu] = useState(false)
    const [value,setValue] = useState()
    const router = useRouter()

    /// function
    
    const handleProgress = () =>{
        handleAnimation()
    }
    const handelKeyDown = (e) => {
        
        if(e.key === 'Enter'){
            setOpenMenu(false)
            handleProgress()
            router.push(`/search/${value}`)
        }
        
    }
    const onChange = (e) => {
        setValue(e.target.value)
    }
    const style ={
        animationName:`${showAnimation ? 'progress' : ''}`
    }
   
    return (
    <>
        <div className="progress-bar">
            <div className="my-bar" style={style} ></div>
        </div>
        <div className="nav-wr">
            <div className="nav-content">
                <div className="nav-img">
                    <Link href="/home">
                        <a onClick={handleAnimation} >
                            <img src="/logo.png" alt="image" className="nav-logo"/>
                        </a>
                    </Link>
                </div>
                <div className="nav-list">
                    <div className="nav-list-item">
                        <Link href="/home">
                            <a onClick={handleProgress}>
                                Home
                            </a>
                        </Link>
                    </div>
                    <div className="nav-list-item">
                        <Link href="/tv">
                            <a onClick={handleProgress} >
                                TV Series
                            </a>
                        </Link>    
                    </div>
                    <div className="nav-list-item">
                        <Link href="/movies/trending">
                            <a onClick={handleProgress} >
                                Movies
                            </a>
                        </Link>    
                    </div>
                    <div className="nav-list-item">
                        <Link href="/movies/popular">
                            <a onClick={handleProgress} >
                                Popular
                            </a>
                        </Link>    
                    </div>
                </div>
                
                {profile && (
                    <>
                        <div className="nav-search">
                            <input
                            type="text" 
                            className="form-search"
                            value={value}
                            onChange ={e => onChange(e)} 
                            placeholder="Bạn muốn xem gì ?" 
                            onKeyDown={e =>handelKeyDown(e)}
                            />
                            <button className="search-btn">
                                <Link href={`/search/${value}`}>
                                    <a href="">
                                        <SearchOutlined className="search-icon" />
                                    </a>
                                </Link>
                            </button>
                        </div>
                        <div className="nav-user">
                            <div className="user-ava">
                                <img src={`/profile-${profile}.jpg`} alt="" />
                            </div>
                            
                            <div className="user-setting">
                                <CaretDownOutlined />
                                <div className="option">
                                    <div
                                     className="log-out" onClick={Logout}>
                                        Log Out
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <div
                className="nav-open-menu"
                onClick={() =>setOpenMenu(!openMenu)}
                >
                    <MenuOutlined />
                </div>
            </div>
            <div
            className={`menu-overlay ${openMenu ? 'open' : ''}`}
            onClick={() =>setOpenMenu(false)}
            ></div>

            <div className={`menu-mobile ${openMenu ? 'open' : ''}`}>
                <div className="menu-mobile-img">
                    <img src="/logo.png" alt="logo" />
                </div>
                <p className="menu-label">Menu</p>
                <div className="menu-list">
                    <div className="search-box">
                        <input
                        type="text" 
                        className="menu-form-search"
                        value={value}
                        onChange ={e => onChange(e)} 
                        placeholder="Bạn Muốn Xem Gì ?" 
                        onKeyDown={e =>handelKeyDown(e)}
                        />
                        <button className="search-btn">
                            <Link href={`/search/${value}`}>
                                <a href="">
                                    <SearchOutlined className="search-icon" />
                                </a>
                            </Link>
                        </button>
                    </div>
                    <div className="menu-list">
                        <Link
                            href="/home"
                        >
                            <a
                            onClick={() =>{
                                setOpenMenu(false)
                                handleProgress()
                            }} 
                            className={`menu-item ${router.pathname.includes('home') ? 'active' : ''}`} 
                            >
                                <HomeOutlined /> Home
                            </a>
                        </Link>
                        <Link
                         href="/tv"
                        >
                            <a
                            onClick={() =>{
                                setOpenMenu(false)
                                handleProgress()
                            }}
                            className={`menu-item ${router.pathname.includes('tv') ? 'active' : ''}`} 
                            >  
                                <DesktopOutlined /> TV
                            </a>
                        </Link>
                        <Link
                         href="/movies/trending"
                        >
                            <a
                            onClick={() =>{
                                setOpenMenu(false)
                                handleProgress()
                            }} 
                            className={`menu-item ${router.pathname.includes('trending') ? 'active' : ''}`} 
                            >
                                <SlackOutlined /> Trending 
                            </a>
                        </Link>
                        <Link
                          href="/movies/popular"
                        >
                            <a
                            onClick={() =>{
                                setOpenMenu(false)
                                handleProgress()
                            }} 
                            className={`menu-item ${router.pathname.includes('popular') ? 'active' : ''}`} 
                            >
                                <DribbbleOutlined /> Popular
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar