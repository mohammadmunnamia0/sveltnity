import './Utlity/sanityClient.js'; // Ensure this is imported to initialize the Sanity client
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Routes/router';
import {
  RouterProvider,
} from "react-router-dom";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
