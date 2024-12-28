// import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, success } = useSelector((state) => state.notification)
  const successStyle = {
    color: 'green',
    background: 'rgb(206, 156, 63);',
    fontSize: '20px',
    border: '5px solid green',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  const errorStyle = {
    color: 'red',
    background: 'rgb(206, 156, 63);',
    fontSize: '20px',
    border: '5px solid red',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  const hideStyle = {
    display: 'none',
  }

  const statusStyle = success ? successStyle : errorStyle

  return <div style={message ? statusStyle : hideStyle}>{message}</div>
}

export default Notification
