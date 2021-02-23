import styles from '../styles/components/Profile.module.css'

export function Profile(){
    return(
        <div className={styles.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/9259187?s=460&u=4df5561bd9624054876d6ccb7b153990511d5b16&v=4" alt="profile-image"/>
            <div>
                <strong>Victor Jordan</strong>
                
                <p>
                    <img src="icons/level.svg" alt="Imagem de seta verde para cima indicando aumento de nível"/>
                    Level 1
                </p>
            </div>
        </div>
    );
}