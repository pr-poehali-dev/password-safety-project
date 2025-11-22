import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface StrengthCheck {
  label: string;
  passed: boolean;
  icon: string;
}

export default function PasswordChecker() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const getChecks = (): StrengthCheck[] => {
    return [
      {
        label: 'Минимум 12 символов',
        passed: password.length >= 12,
        icon: 'Check',
      },
      {
        label: 'Заглавные буквы',
        passed: /[A-Z]/.test(password),
        icon: 'Check',
      },
      {
        label: 'Строчные буквы',
        passed: /[a-z]/.test(password),
        icon: 'Check',
      },
      {
        label: 'Цифры',
        passed: /[0-9]/.test(password),
        icon: 'Check',
      },
      {
        label: 'Специальные символы',
        passed: /[^a-zA-Z0-9]/.test(password),
        icon: 'Check',
      },
    ];
  };

  const checks = getChecks();
  const passedChecks = checks.filter(c => c.passed).length;
  const totalChecks = checks.length;
  const strengthPercent = (passedChecks / totalChecks) * 100;

  const getStrengthInfo = () => {
    if (password === '') return { text: '', color: '', bgColor: '' };
    if (passedChecks <= 2) return { 
      text: 'Слабый пароль', 
      color: 'text-destructive',
      bgColor: 'bg-destructive' 
    };
    if (passedChecks <= 3) return { 
      text: 'Средний пароль', 
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-500' 
    };
    if (passedChecks <= 4) return { 
      text: 'Хороший пароль', 
      color: 'text-blue-600',
      bgColor: 'bg-blue-500' 
    };
    return { 
      text: 'Отличный пароль!', 
      color: 'text-accent',
      bgColor: 'bg-accent' 
    };
  };

  const strengthInfo = getStrengthInfo();

  const getRecommendations = () => {
    const recommendations = [];
    if (password.length < 12) recommendations.push('Увеличьте длину до 12+ символов');
    if (!/[A-Z]/.test(password)) recommendations.push('Добавьте заглавные буквы');
    if (!/[a-z]/.test(password)) recommendations.push('Добавьте строчные буквы');
    if (!/[0-9]/.test(password)) recommendations.push('Добавьте цифры');
    if (!/[^a-zA-Z0-9]/.test(password)) recommendations.push('Добавьте специальные символы');
    return recommendations;
  };

  const recommendations = getRecommendations();

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <Card className="p-8 shadow-lg">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Проверка пароля</h2>
            <p className="text-muted-foreground">
              Введите пароль для проверки его надёжности
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password-check">Ваш пароль</Label>
            <div className="relative">
              <Input
                id="password-check"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль..."
                className="pr-10 text-lg"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
              </Button>
            </div>
          </div>

          {password && (
            <>
              <div className="space-y-3 animate-scale-in">
                <div className="flex items-center justify-between">
                  <span className={`text-lg font-semibold ${strengthInfo.color}`}>
                    {strengthInfo.text}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {passedChecks}/{totalChecks}
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strengthInfo.bgColor} transition-all duration-500`}
                    style={{ width: `${strengthPercent}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="font-medium">Критерии надёжности</h3>
                <div className="space-y-2">
                  {checks.map((check, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          check.passed ? 'bg-accent' : 'bg-muted'
                        }`}
                      >
                        {check.passed && (
                          <Icon name="Check" size={14} className="text-white" />
                        )}
                      </div>
                      <span
                        className={check.passed ? 'text-foreground' : 'text-muted-foreground'}
                      >
                        {check.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {recommendations.length > 0 && (
                <div className="space-y-3 pt-2 border-t">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Icon name="Lightbulb" size={20} />
                    <h3 className="font-medium">Рекомендации</h3>
                  </div>
                  <ul className="space-y-2">
                    {recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span className="text-muted-foreground">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
