## 📘 @docs/components/compound-components.md

### 🧩 Compound Components Pattern (Next.js 15+ / React 18+)

**Цель:**  
Создать группу компонентов, работающих как единое целое, через общий контекст (`useContext`).  
Это позволяет родительскому компоненту делиться состоянием и поведением с дочерними без prop drilling.

---

### 📁 Структура проекта

```
src/
  components/
    Accordion/
      Accordion.tsx
      AccordionItem.tsx
      AccordionTrigger.tsx
      AccordionContent.tsx
      index.ts
```

---

### ⚙️ 1. Создание контекста и родительского компонента

```tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

/**
 * @typedef AccordionContextValue
 * @property {string | null} openItemId - ID открытого элемента.
 * @property {(id: string) => void} toggleItem - Функция переключения элемента.
 */
interface AccordionContextValue {
  openItemId: string | null;
  toggleItem: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | undefined>(
  undefined
);

/**
 * @typedef AccordionProps
 * @property {ReactNode} children - Список дочерних компонентов.
 */
interface AccordionProps {
  children: ReactNode;
}

/**
 * Корневой компонент аккордеона.
 * @example
 * ```tsx
 * <Accordion>
 *   <Accordion.Item id="1">
 *     <Accordion.Trigger>Title</Accordion.Trigger>
 *     <Accordion.Content>Details</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion>
 */
export const Accordion = ({ children }: AccordionProps): JSX.Element => {
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  const toggleItem = useCallback((id: string) => {
    setOpenItemId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <AccordionContext.Provider value={{ openItemId, toggleItem }}>
      <div className="w-full rounded-xl border p-2">{children}</div>
    </AccordionContext.Provider>
  );
};

/**
 * Хук для доступа к контексту аккордеона.
 * @throws {Error} Если используется вне компонента <Accordion>.
 */
export const useAccordionContext = (): AccordionContextValue => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("useAccordionContext must be used within <Accordion>");
  }
  return context;
};
```

---

### ⚙️ 2. Дочерние компоненты

#### AccordionItem

```tsx
import React, { ReactNode } from "react";
import { useAccordionContext } from "./Accordion";

/**
 * @typedef AccordionItemProps
 * @property {string} id - Уникальный идентификатор элемента.
 * @property {ReactNode} children - Содержимое элемента.
 */
interface AccordionItemProps {
  id: string;
  children: ReactNode;
}

/**
 * Элемент аккордеона. Оборачивает триггер и контент.
 */
export const AccordionItem = ({ id, children }: AccordionItemProps): JSX.Element => {
  const { openItemId } = useAccordionContext();
  const isOpen = openItemId === id;

  return (
    <div data-open={isOpen} className="mb-2 rounded-lg border p-2">
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { id, isOpen }) : child
      )}
    </div>
  );
};
```

#### AccordionTrigger

```tsx
import React from "react";
import { useAccordionContext } from "./Accordion";

interface AccordionTriggerProps {
  id?: string;
  isOpen?: boolean;
  children: React.ReactNode;
}

/**
 * Кнопка, открывающая/закрывающая контент.
 */
export const AccordionTrigger = ({
  id,
  isOpen,
  children,
}: AccordionTriggerProps): JSX.Element => {
  const { toggleItem } = useAccordionContext();
  if (!id) return <>{children}</>;

  return (
    <button
      type="button"
      onClick={() => toggleItem(id)}
      className="flex w-full items-center justify-between font-medium"
    >
      {children}
      <span className="text-sm text-gray-500">{isOpen ? "−" : "+"}</span>
    </button>
  );
};
```

#### AccordionContent

```tsx
import React from "react";

interface AccordionContentProps {
  isOpen?: boolean;
  children: React.ReactNode;
}

/**
 * Контейнер для раскрывающегося контента.
 */
export const AccordionContent = ({
  isOpen,
  children,
}: AccordionContentProps): JSX.Element => {
  if (!isOpen) return null;
  return <div className="mt-2 text-sm text-gray-700">{children}</div>;
};
```

---

### 📦 3. Индексный экспорт

```tsx
import { Accordion } from "./Accordion";
import { AccordionItem } from "./AccordionItem";
import { AccordionTrigger } from "./AccordionTrigger";
import { AccordionContent } from "./AccordionContent";

export const CompoundAccordion = Object.assign(Accordion, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});

export default CompoundAccordion;
```

---

### 🧠 4. Использование

```tsx
"use client";

import CompoundAccordion from "@/components/Accordion";

export default function ExampleComponent(): JSX.Element {
  return (
    <CompoundAccordion>
      <CompoundAccordion.Item id="1">
        <CompoundAccordion.Trigger>Что входит в букет?</CompoundAccordion.Trigger>
        <CompoundAccordion.Content>Всё необходимое для вашего события.</CompoundAccordion.Content>
      </CompoundAccordion.Item>

      <CompoundAccordion.Item id="2">
        <CompoundAccordion.Trigger>Можно выбрать доставку?</CompoundAccordion.Trigger>
        <CompoundAccordion.Content>Да, доставка по городу и за его пределы.</CompoundAccordion.Content>
      </CompoundAccordion.Item>
    </CompoundAccordion>
  );
}
```

---

### 💡 Best Practices

- ✅ Используй **`Object.assign`** для удобного экспорта подкомпонентов.  
- ✅ Всегда **типизируй контекст** через интерфейс.  
- ✅ Добавляй **JSDoc-комментарии** для автоподсказок в Cursor.  
- ✅ Все компоненты — **client components**, если используют `useState` / `useContext`.  
- ✅ Для стабильных пропсов используй `useCallback`.  
- ⚠️ Не передавай `children` напрямую в контекст — только данные и методы.
