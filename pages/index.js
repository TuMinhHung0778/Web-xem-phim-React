import Head from 'next/head'
import { useRouter } from 'next/router'
import {useContext,useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ProfileContext } from '../context/profile'
import { AnimationContext } from '../context/Animation'

export default function Home() {
  const router = useRouter()
  const {handleAuth,profile,isAuthenticated} = useContext(ProfileContext)
  const {handleAnimation} = useContext(AnimationContext)

  const handelProfile = (profile) => {
    handleAuth(profile)
    router.push('/home')
    handleAnimation()
  }

  useEffect(()=>{
    if(isAuthenticated){
      router.push('/home')
      handleAnimation()
    }
  },[isAuthenticated])
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className="main-content">
          <div className="main-title"> Ai đang Xem ?</div>
          <div className="profile-wr">
              <div className="profile" onClick={() =>handelProfile(1)}>
                <img src="/profile-1.jpg" alt="" className="profile-icon" />
                <p>Cam</p>
              </div>  
              <div className="profile" onClick={() =>handelProfile(2)}>
                <img src="/profile-2.jpg" alt="" className="profile-icon" />
                <p>  Xanh</p>

              </div>
              <div className="profile" onClick={() =>handelProfile(3)}>
                <img src="/profile-3.jpg" alt="" className="profile-icon" />
                <p> Xanh lục</p>
                
              </div>
              <div className="profile" onClick={() =>handelProfile(4)}>
                <img src="/profile-4.jpg" alt="" className="profile-icon" />
                <p> Đỏ</p>

              </div>
          </div>
        </div>
      </main>
    </div>
  )
}
