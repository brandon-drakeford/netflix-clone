import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function Loader ({ customClass, size, text }) {
    return (
        <div className={`${!customClass ? 'loader' : customClass}`}>
             <FontAwesomeIcon icon={faSpinner} size={size} spin />

             {text && (<span className="loader-text">{text}</span>)}
        </div>
    )
}