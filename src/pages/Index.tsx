import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PasswordGenerator from '@/components/PasswordGenerator';
import PasswordChecker from '@/components/PasswordChecker';
import FAQ from '@/components/FAQ';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeTab, setActiveTab] = useState('generator');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12 space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Icon name="Shield" size={28} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Генератор Паролей
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Создавайте надёжные пароли и проверяйте существующие на безопасность
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8 h-auto p-1 bg-white shadow-md">
            <TabsTrigger
              value="generator"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Icon name="Key" size={18} />
              <span className="hidden sm:inline">Генератор</span>
            </TabsTrigger>
            <TabsTrigger
              value="checker"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Icon name="Search" size={18} />
              <span className="hidden sm:inline">Проверка</span>
            </TabsTrigger>
            <TabsTrigger
              value="faq"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Icon name="HelpCircle" size={18} />
              <span className="hidden sm:inline">FAQ</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="mt-0">
            <PasswordGenerator />
          </TabsContent>

          <TabsContent value="checker" className="mt-0">
            <PasswordChecker />
          </TabsContent>

          <TabsContent value="faq" className="mt-0">
            <FAQ />
          </TabsContent>
        </Tabs>

        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon name="Lock" size={16} />
            <p>Все пароли генерируются локально в вашем браузере</p>
          </div>
          <p>Мы не сохраняем и не передаём ваши данные</p>
        </footer>
      </div>
    </div>
  );
}