'use client';

import { Clock, Languages, ShieldCheck, Server, UserCheck,ShoppingCart,DollarSign,Globe ,Gift,TrendingUp,AlertCircle,BarChart,Truck,Layers,Users,Activity,MessageCircle,Bell,Calendar,Heart,ArrowUpRight,Smile,CheckCircle,Zap,Shield,HeartHandshake,Award,PhoneCall} from 'lucide-react';
import { motion } from 'framer-motion';

function inferBenefitIconKey(benefit) {
  const t = `${benefit?.title || ''} ${benefit?.description || ''}`.toLowerCase();
  if (/\b24\s*\/\s*7\b|\bavailability\b|never miss|always available|beyond hours\b/.test(t)) return 'Clock';
  if (/multilingual|multi[\s-]language|\bmany languages\b/.test(t)) return 'Languages';
  if (/cost[\s-]?efficient|cost[\s-]effective|affordable|\bpricing\b|reduce .*cost|save money\b/.test(t))
    return 'DollarSign';
  if (/growth|scale|reach|\bexpand\b|business growth\b|customer reach\b/.test(t)) return 'TrendingUp';
  if (/trust|accessibility|recognition\b|secure\b/.test(t)) return 'Shield';
  if (/natural|\bconversation\b|human-like\b|\bengage\b|\bvoices?\b/.test(t)) return 'MessageCircle';
  return null;
}

export default function KeyBenefits({ 
  title = "Key Benefits", 
  description = "",
  benefits = [] 
}) {
  const iconMap = {
    Clock: Clock,
    Languages: Languages,
    ShieldCheck: ShieldCheck,
    Server: Server,
    UserCheck: UserCheck,
    ShoppingCart: ShoppingCart,
    DollarSign: DollarSign,
    Globe: Globe,
    Gift: Gift,
    TrendingUp: TrendingUp,
    AlertCircle: AlertCircle,
    BarChart: BarChart,
    Truck: Truck,
    Layers: Layers,
    Users: Users,
    Activity: Activity,
    MessageCircle: MessageCircle,
    Bell: Bell,
    Calendar: Calendar,
    Heart: Heart,
    ArrowUpRight: ArrowUpRight,
    Smile: Smile,
    Zap: Zap,
    Shield: Shield,
    CheckCircle:CheckCircle,
    HeartHandshake:HeartHandshake,
    Award:Award,
    PhoneCall:PhoneCall
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl sm:text-4xl text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {description}
            </motion.p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {benefits.map((benefit, index) => {
            const raw = typeof benefit.icon === 'string' ? benefit.icon : null;
            const inferred = inferBenefitIconKey(benefit);
            const resolvedKey =
              inferred || (raw && iconMap[raw] ? raw : 'Globe');
            const IconComponent = iconMap[resolvedKey] || MessageCircle;
            return (
              <motion.div 
                key={index}
                className="bg-indigo-50/30 p-6 rounded-xl border border-indigo-100 hover:border-indigo-100 transition-all duration-300 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-indigo-50 rounded-full border border-indigo-100 flex items-center justify-center mb-4">
                    {IconComponent && (
                      <IconComponent className="w-6 h-6 text-[#500CFD]" />
                    )}
                  </div>
                  <h3 className="text-lg  text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}