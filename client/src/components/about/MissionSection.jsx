import styles from  './mission.module.css'

const MissionSection = ({ content }) => {
    return (
        <section className={`${styles.missionSection} text-center`}>
            <p>{content}</p>
        </section>
    )
}

export default MissionSection