import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                customBlue: '#1C2E4A', // Define a custom name for your color
                customPurple : '#3F2A52',
                customPurple1: '#7071E8',
                customLightPurple: '#75619D',
                skyBlue:'#AAC4FF',// do not touch this color
                darkBlue: 'rgba(32, 41, 56, 1)',
                tableBG: 'rgba(131, 130, 178, 1)',
                regis_login: 'rgba(8, 61, 119, 1)',
                form_design: 'rgba(32, 41, 56, 1)'
            },
        },
    },

    plugins: [forms],
};
