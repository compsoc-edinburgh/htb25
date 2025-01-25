"use client"
import { motion } from 'framer-motion' 

const ArrowSVG = ({arrowColor = 'white'}) => {
    return (
        <motion.div
            className="flex gap-5"
            initial={{ x: "-30%" }}
            animate={{ x: "0%" }}
            transition={{
                duration: 4,
                ease: "linear",
                repeat: Infinity,
                repeatType: 'loop',
            }}
            style={{ whiteSpace: "nowrap" }}
        >
            {Array.from({ length: 20 }).map((_, index) => (
                <motion.svg key={index} className = "h-12 w-12 shrink-0" viewBox="0 0 77 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                d="M0.7854 27.8083V40.1742H54.2382L27.4173 66.9669H43.0494L76.0933 33.9613L43.0494 0.806885H27.4173L54.2382 27.7557L0.7854 27.8083Z" 
                fill={arrowColor}
                />
            </motion.svg>
            ))}
        </motion.div>
    )
}
export default ArrowSVG;