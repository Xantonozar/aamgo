# 🥭 আমGO - Premium Mango E-commerce Platform

AamGo is a modern, responsive e-commerce platform specializing in premium quality mangoes. Built with Next.js and Tailwind CSS, it offers a seamless shopping experience for mango enthusiasts.

![আমGO Banner](public/images/banner.jpg)

## ✨ Features

- **Premium Mango Selection**
  - Himsagar
  - Lengra
  - Gopalvog
  - Amropali
  - Khirsapat
  - And more...

- **Advanced Filtering System**
  - Filter by mango type
  - Price range filtering
  - Sort by popularity, price, and name

- **User-Friendly Interface**
  - Responsive design for all devices
  - Intuitive navigation
  - Beautiful product cards with hover effects
  - Smooth animations and transitions

- **Contact System**
  - Integrated EmailJS for reliable communication
  - Secure form handling
  - Real-time feedback

## 🚀 Tech Stack

- **Frontend Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Email Service**: EmailJS
- **Icons**: React Icons
- **Animation**: Framer Motion

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/xanton_ozar/aamgo.git
   cd aamgo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:
   ```env
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   EMAILJS_SERVICE_ID=your_service_id
   EMAILJS_TEMPLATE_ID=your_template_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
aamgo/
├── app/
│   ├── components/
│   │   ├── ContactForm.js
│   │   ├── FilterPanel.js
│   │   ├── ProductGrid.js
│   │   └── ProductCard.js
│   ├── layout.js
│   └── page.js
├── public/
│   └── images/
├── styles/
│   └── globals.css
└── package.json
```

## 🔧 Configuration

### EmailJS Setup
1. Sign up for an EmailJS account
2. Create a new email service
3. Create an email template
4. Add your credentials to `.env.local`

### Tailwind Configuration
The project uses a custom color scheme with mango-inspired colors:
- Primary: #f57f17 (Mango Orange)
- Secondary: #ffd54f (Mango Yellow)
- Accent: #ff8f00 (Mango Dark)

## 🎨 Customization

### Adding New Mango Types
1. Open `app/components/FilterPanel.js`
2. Add new mango type to the `mangoTypes` array
3. Update the filter logic in `ProductGrid.js`

### Modifying Styles
- Global styles are in `styles/globals.css`
- Component-specific styles use Tailwind classes
- Custom colors can be modified in `tailwind.config.js`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License
not avialable right now 

## 👥 Authors

- Your Name - Initial work - (https://github.com/xanton_ozar)

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by the rich mango culture
- Built with love for mango enthusiasts

---

Made with ❤️ and 🥭
