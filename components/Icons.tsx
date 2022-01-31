import { scale } from '@utils/animation'
import { AnimatePresence, m } from 'framer-motion'

export const LogoIcon = (props) => {
  return (
    <AnimatePresence>
      <m.svg
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        variants={scale}
        initial="0"
        animate="1"
        exit="0"
        {...props}
      >
        <title>YuCheng Kuo</title>
        <path
          d="M10.5 7V21M10.5 7H3.5L7 14L3.5 21H10.5M10.5 7H17.5M10.5 21H17.5M10.5 21L17.5 7M21 14.2917L24.5 7H17.5M21 14.2917L24.5 21H17.5M21 14.2917L17.5 21"
          strokeWidth="1.6"
          strokeLinejoin="round"
          className="stroke-current"
        />
      </m.svg>
    </AnimatePresence>
  )
}

export const LeftArrowIcon = (props) => {
  return (
    <AnimatePresence>
      <m.svg
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        variants={scale}
        initial="0"
        animate="1"
        exit="0"
        aria-label="go back to last page"
        {...props}
      >
        <path
          d="M4.66675 14C4.66675 13.3557 5.18908 12.8333 5.83341 12.8333H22.1667C22.8111 12.8333 23.3334 13.3557 23.3334 14C23.3334 14.6443 22.8111 15.1667 22.1667 15.1667H5.83341C5.18908 15.1667 4.66675 14.6443 4.66675 14Z"
          className="fill-current"
          fillRule="evenodd"
          clipRule="evenodd"
        />
        <path
          d="M14.825 5.00838C15.2807 5.46399 15.2807 6.20268 14.825 6.6583L7.48333 14L14.825 21.3417C15.2807 21.7973 15.2807 22.536 14.825 22.9916C14.3694 23.4472 13.6307 23.4472 13.1751 22.9916L5.00846 14.825C4.55285 14.3694 4.55285 13.6307 5.00846 13.175L13.1751 5.00838C13.6307 4.55277 14.3694 4.55277 14.825 5.00838Z"
          className="fill-current"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </m.svg>
    </AnimatePresence>
  )
}

export const RightArrowIcon = () => {
  return (
    <m.svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      variants={scale}
      initial="0"
      animate="1"
      exit="0"
      aria-label="continue to the item"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.66667 7.99999C2.66667 7.63181 2.96514 7.33333 3.33333 7.33333H12.6667C13.0349 7.33333 13.3333 7.63181 13.3333 7.99999C13.3333 8.36818 13.0349 8.66666 12.6667 8.66666H3.33333C2.96514 8.66666 2.66667 8.36818 2.66667 7.99999Z"
        className="fill-current"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.52859 2.86193C7.78894 2.60158 8.21105 2.60158 8.4714 2.86193L13.1381 7.5286C13.3984 7.78895 13.3984 8.21106 13.1381 8.47141L8.4714 13.1381C8.21105 13.3984 7.78894 13.3984 7.52859 13.1381C7.26824 12.8777 7.26824 12.4556 7.52859 12.1953L11.7239 8L7.52859 3.80474C7.26824 3.54439 7.26824 3.12228 7.52859 2.86193Z"
        className="fill-current"
      />
    </m.svg>
  )
}

export const UpRightArrowIcon = () => {
  return (
    <m.svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      variants={scale}
      initial="0"
      animate="1"
      exit="0"
      aria-label="external link"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.8047 4.19526C12.0651 4.45561 12.0651 4.87772 11.8047 5.13807L5.13807 11.8047C4.87772 12.0651 4.45561 12.0651 4.19526 11.8047C3.93491 11.5444 3.93491 11.1223 4.19526 10.8619L10.8619 4.19526C11.1223 3.93491 11.5444 3.93491 11.8047 4.19526Z"
        className="fill-current"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 4.66667C4 4.29848 4.29848 4 4.66667 4H11.3333C11.7015 4 12 4.29848 12 4.66667V11.3333C12 11.7015 11.7015 12 11.3333 12C10.9651 12 10.6667 11.7015 10.6667 11.3333V5.33333H4.66667C4.29848 5.33333 4 5.03486 4 4.66667Z"
        className="fill-current"
      />
    </m.svg>
  )
}

export const AboutIcon = (props) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.5 7C16.5 8.06087 16.0786 9.07828 15.3284 9.82843C14.5783 10.5786 13.5609 11 12.5 11C11.4391 11 10.4217 10.5786 9.67157 9.82843C8.92143 9.07828 8.5 8.06087 8.5 7C8.5 5.93913 8.92143 4.92172 9.67157 4.17157C10.4217 3.42143 11.4391 3 12.5 3C13.5609 3 14.5783 3.42143 15.3284 4.17157C16.0786 4.92172 16.5 5.93913 16.5 7V7ZM12.5 14C10.6435 14 8.86301 14.7375 7.55025 16.0503C6.2375 17.363 5.5 19.1435 5.5 21H19.5C19.5 19.1435 18.7625 17.363 17.4497 16.0503C16.137 14.7375 14.3565 14 12.5 14V14Z"
        stroke="#E3E3E3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ReadCVIcon = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0)">
        <rect
          x="6.74097"
          y="1.23541"
          width="15.7973"
          height="18.1011"
          rx="2"
          transform="rotate(15 6.74097 1.23541)"
          stroke="#E3E3E3"
          strokeWidth="2"
        />
        <line
          x1="9.539"
          y1="6.13226"
          x2="17.1288"
          y2="8.226"
          stroke="#E3E3E3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="8.5517"
          y1="9.58789"
          x2="16.1415"
          y2="11.6816"
          stroke="#E3E3E3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="1"
          y1="-1"
          x2="5.58221"
          y2="-1"
          transform="matrix(0.963993 0.265927 -0.265931 0.963992 6.33435 13.7416)"
          stroke="#E3E3E3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export const MailIcon = (props) => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.83335 3.33325H17.1667C18.0834 3.33325 18.8334 4.08325 18.8334 4.99992V14.9999C18.8334 15.9166 18.0834 16.6666 17.1667 16.6666H3.83335C2.91669 16.6666 2.16669 15.9166 2.16669 14.9999V4.99992C2.16669 4.08325 2.91669 3.33325 3.83335 3.33325Z"
        stroke="#E3E3E3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.8334 5L10.5 10.8333L2.16669 5"
        stroke="#E3E3E3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
