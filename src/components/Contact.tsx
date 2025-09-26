"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "./ui/button"

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "italosergio@mail.com",
      href: "mailto:italosergio@mail.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "WhatsApp", 
      value: "+55 (88) 99469-3031",
      href: "https://wa.me/5588994693031"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Localização",
      value: "Brasil",
      href: "#"
    }
  ]

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Entre em <span className="gradient-text">Contato</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Tem um projeto em mente? Vamos conversar! Estou sempre aberto a 
            discutir novas oportunidades e colaborações interessantes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold mb-8">Vamos nos conectar!</h3>
            
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-4 p-4 rounded-lg bg-card hover:bg-accent/50 transition-colors group"
              >
                <div className="text-primary group-hover:scale-110 transition-transform">
                  {info.icon}
                </div>
                <div>
                  <h4 className="font-semibold">{info.title}</h4>
                  <p className="text-muted-foreground">{info.value}</p>
                </div>
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <p className="text-muted-foreground mb-4">
                Prefere uma conversa mais rápida? Me encontre nas redes sociais:
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://linkedin.com/in/italosergio" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://github.com/italosergio" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://instagram.com/italosergio" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://t.me/italosergio" target="_blank" rel="noopener noreferrer">
                    Telegram
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl p-8 shadow-lg"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Assunto
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="Sobre o que você gostaria de conversar?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                  placeholder="Conte-me mais sobre seu projeto ou ideia..."
                />
              </div>
              
              <Button type="submit" className="w-full gradient-bg text-white glow-effect">
                <Send className="w-4 h-4 mr-2" />
                Enviar Mensagem
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact