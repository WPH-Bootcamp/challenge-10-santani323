# Redux Profile State Management Setup

## Overview
Redux telah dikonfigurasi untuk mengelola state profile aplikasi Anda dengan menggunakan Redux Toolkit.

## File Struktur

```
src/
├── store/
│   ├── store.ts              # Redux store configuration
│   └── slices/
│       └── profileSlice.ts   # Profile reducer dan actions
├── providers/
│   └── ReduxProvider.tsx     # Redux provider untuk Next.js
└── hooks/
    ├── useAppDispatch.ts     # Custom hook untuk dispatch dengan TypeScript
    ├── useAppSelector.ts     # Custom hook untuk selector dengan TypeScript
    └── useProfileRedux.ts    # Custom hook untuk profile management
```

## Instalasi Dependencies

Dependencies yang sudah diinstall:
- `@reduxjs/toolkit` - Redux dengan utility untuk mempermudah development
- `react-redux` - React bindings untuk Redux

## Penggunaan

### 1. Profile State Structure
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  headline: string;
  avatar?: string;
  bio?: string;
}

interface ProfileState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
```

### 2. Available Actions
- `setLoading(boolean)` - Set loading state
- `setUser(User)` - Set user data
- `updateUser(Partial<User>)` - Update user data
- `setError(string)` - Set error message
- `clearError()` - Clear error state
- `clearUser()` - Clear user data

### 3. Menggunakan Profile Hook

```typescript
import { useProfileRedux } from "@/hooks/useProfileRedux";

export default function MyComponent() {
  const {
    user,           // User data atau null
    loading,        // Boolean loading state
    error,          // Error message atau null
    fetchUserProfile,    // Function untuk fetch profile
    updateUserProfile,   // Function untuk update profile
    clearProfile,   // Function untuk clear profile
  } = useProfileRedux();

  // Fetch profile
  const handleFetch = async () => {
    await fetchUserProfile();
  };

  // Update profile
  const handleUpdate = async () => {
    await updateUserProfile({
      name: "New Name",
      headline: "New Headline",
      avatar: fileObject, // Optional
    });
  };

  // Clear profile
  const handleLogout = () => {
    clearProfile();
  };

  return (
    // ... component JSX
  );
}
```

### 4. Mengakses State Langsung

Jika Anda ingin mengakses state langsung tanpa custom hook:

```typescript
import { useAppSelector } from "@/hooks/useAppSelector";

export default function MyComponent() {
  const user = useAppSelector((state) => state.profile.user);
  const loading = useAppSelector((state) => state.profile.loading);
  const error = useAppSelector((state) => state.profile.error);

  return (
    // ... component JSX
  );
}
```

### 5. Dispatch Actions Langsung

```typescript
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setUser, updateUser } from "@/store/slices/profileSlice";

export default function MyComponent() {
  const dispatch = useAppDispatch();

  const handleUpdate = () => {
    dispatch(updateUser({ name: "New Name" }));
  };

  return (
    // ... component JSX
  );
}
```

## Integrasi dengan Components

### EditProfile Component
Component `editProfile.tsx` sudah diintegrasikan dengan Redux:
- Menggunakan `useProfileRedux` hook
- State form di-sync dengan Redux store
- Update profile dilakukan melalui Redux actions

## Extend Redux

Untuk menambah slice baru (misalnya untuk articles):

1. Buat file `src/store/slices/articlesSlice.ts`:
```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Article {
  id: string;
  title: string;
  // ... other fields
}

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    items: [] as Article[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    // ... reducer cases
  },
});

export default articlesSlice.reducer;
```

2. Update `src/store/store.ts`:
```typescript
import articlesReducer from "./slices/articlesSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    articles: articlesReducer,  // Add here
  },
});
```

3. Gunakan hook untuk articles:
```typescript
const articles = useAppSelector((state) => state.articles.items);
const loading = useAppSelector((state) => state.articles.loading);
```

## Best Practices

1. **Gunakan custom hooks** (`useProfileRedux`) daripada direct selectors untuk logic yang kompleks
2. **Keep reducers pure** - jangan modifikasi state secara langsung di luar reducer
3. **Handle loading dan error states** - selalu tampilkan loading dan error indicators kepada user
4. **Normalize state** - simpan data dalam struktur yang normalized untuk memudahkan update
5. **Use async thunks** - untuk side effects yang kompleks, pertimbangkan menggunakan createAsyncThunk

## Troubleshooting

### Redux DevTools
Untuk development, Anda bisa install Redux DevTools browser extension untuk melihat state dan actions.

### State Tidak Update
- Pastikan Anda menggunakan action creators yang benar
- Jangan mutate state langsung di reducer
- Pastikan component di-wrap dengan `<ReduxProvider>`

### Type Errors
- Gunakan `useAppDispatch` dan `useAppSelector` untuk proper TypeScript support
- Import types dari `@/store/store`
