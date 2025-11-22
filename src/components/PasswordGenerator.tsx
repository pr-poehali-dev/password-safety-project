import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const { toast } = useToast();

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (options.uppercase) chars += uppercase;
    if (options.lowercase) chars += lowercase;
    if (options.numbers) chars += numbers;
    if (options.symbols) chars += symbols;

    if (chars === '') {
      toast({
        title: 'Ошибка',
        description: 'Выберите хотя бы один тип символов',
        variant: 'destructive',
      });
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < options.length; i++) {
      generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(generatedPassword);
  };

  useEffect(() => {
    generatePassword();
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      toast({
        title: 'Скопировано!',
        description: 'Пароль скопирован в буфер обмена',
      });
    } catch {
      toast({
        title: 'Ошибка',
        description: 'Не удалось скопировать пароль',
        variant: 'destructive',
      });
    }
  };

  const getStrength = () => {
    let score = 0;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    
    if (score <= 2) return { text: 'Слабый', color: 'bg-destructive', percent: 33 };
    if (score <= 4) return { text: 'Средний', color: 'bg-yellow-500', percent: 66 };
    return { text: 'Надёжный', color: 'bg-accent', percent: 100 };
  };

  const strength = getStrength();

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
      <Card className="p-8 shadow-lg">
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <input
                type="text"
                value={password}
                readOnly
                className="w-full text-2xl font-mono bg-transparent border-none outline-none truncate"
              />
            </div>
            <Button
              onClick={copyToClipboard}
              variant="ghost"
              size="icon"
              className="shrink-0"
            >
              <Icon name="Copy" size={20} />
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Надёжность</span>
              <span className={`font-medium ${strength.color.replace('bg-', 'text-')}`}>
                {strength.text}
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full ${strength.color} transition-all duration-500`}
                style={{ width: `${strength.percent}%` }}
              />
            </div>
          </div>

          <Button onClick={generatePassword} className="w-full" size="lg">
            <Icon name="RefreshCw" size={18} className="mr-2" />
            Сгенерировать новый пароль
          </Button>
        </div>
      </Card>

      <Card className="p-8 shadow-lg">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Настройки</h3>

          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Длина: {options.length}</Label>
                <span className="text-sm text-muted-foreground">{options.length} символов</span>
              </div>
              <Slider
                value={[options.length]}
                onValueChange={([value]) => setOptions({ ...options, length: value })}
                min={8}
                max={64}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between py-3 border-b">
                <Label htmlFor="uppercase" className="cursor-pointer">
                  Заглавные буквы (A-Z)
                </Label>
                <Switch
                  id="uppercase"
                  checked={options.uppercase}
                  onCheckedChange={(checked) => setOptions({ ...options, uppercase: checked })}
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b">
                <Label htmlFor="lowercase" className="cursor-pointer">
                  Строчные буквы (a-z)
                </Label>
                <Switch
                  id="lowercase"
                  checked={options.lowercase}
                  onCheckedChange={(checked) => setOptions({ ...options, lowercase: checked })}
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b">
                <Label htmlFor="numbers" className="cursor-pointer">
                  Цифры (0-9)
                </Label>
                <Switch
                  id="numbers"
                  checked={options.numbers}
                  onCheckedChange={(checked) => setOptions({ ...options, numbers: checked })}
                />
              </div>

              <div className="flex items-center justify-between py-3">
                <Label htmlFor="symbols" className="cursor-pointer">
                  Символы (!@#$%...)
                </Label>
                <Switch
                  id="symbols"
                  checked={options.symbols}
                  onCheckedChange={(checked) => setOptions({ ...options, symbols: checked })}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
