import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Paper,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4a90e2', // Custom primary color
    },
    secondary: {
      main: '#e91e63', // Custom secondary color
    },
    background: {
      default: '#f5f7fa',
    },
    text: {
      primary: '#333',
      secondary: '#666',
    },
  },
});

// Language options and API functions...


const languageOptions = [
  { name: 'Hindi', code: 'hi-t-i0-und' },
  { name: 'Russian', code: 'ru-t-i0-und' },
  { name: 'Arabic', code: 'ar-t-i0-und' },
  { name: 'Greek', code: 'el-t-i0-und' },
  { name: 'Japanese', code: 'ja-t-i0-und' },
  { name: 'Chinese (Pinyin)', code: 'zh-t-i0-pinyin' }
];

const urlWithQuery = (query, languageCode) => {
  return `https://inputtools.google.com/request?text=${query}&itc=${languageCode}&num=13&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`;
};

const fetchResults = async (query, languageCode) => {
  const res = await fetch(urlWithQuery(query, languageCode));
  const resJson = await res.json();
  return resJson[1][0][1];
};

function App() {
  const [text, setText] = useState('');
  const [res, setRes] = useState([]);
  const [language, setLanguage] = useState(languageOptions[0].code);

  const onTextChange = (e) => {
    const typedValue = e.target.value;
    setText(typedValue);
    if (typedValue) {
      fetchResults(typedValue, language).then((apiRes) => {
        setRes(apiRes);
      });
    } else {
      setRes([]);
    }
  };

  const onLanguageChange = (e) => {
    setLanguage(e.target.value);
    setRes([]);
    setText('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 5, backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        {/* Header Section */}
        <Typography variant="h4" color="primary" gutterBottom>
          Multilingual Transliteration Tool
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Type in English to get real-time suggestions in your selected language's script.
        </Typography>

        {/* Language Selector */}
        <FormControl fullWidth variant="outlined" sx={{ mt: 3, mb: 3 }}>
          <InputLabel>Choose Language</InputLabel>
          <Select
            value={language}
            onChange={onLanguageChange}
            label="Choose Language"
            sx={{ color: 'primary.main', backgroundColor: 'background.default' }}
          >
            {languageOptions.map((lang) => (
              <MenuItem key={lang.code} value={lang.code}>
                {lang.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Input Section */}
        <TextField
          fullWidth
          label="Enter Text"
          variant="outlined"
          value={text}
          onChange={onTextChange}
          placeholder="Type something here..."
          sx={{ mb: 3, borderColor: 'primary.main' }}
        />

        {/* Suggestions Section */}
        <Typography variant="h6" color="primary" gutterBottom>
          Suggestions
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'center',
          }}
        >
          {res.length > 0 ? (
            res.map((val) => (
              <Paper
                key={val}
                elevation={2}
                sx={{
                  padding: '10px 15px',
                  backgroundColor: 'secondary.main',
                  color: 'white',
                  borderRadius: '5px',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                  cursor: 'pointer',
                }}
              >
                {val}
              </Paper>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No suggestions available.
            </Typography>
          )}
        </Box>

        {/* Footer Section */}
        <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 5 }}>
          &copy; 2024 Multilingual Transliteration Tool. All Rights Reserved.
        </Typography>
      </Container>
    </ThemeProvider>
  );
}

export default App;
