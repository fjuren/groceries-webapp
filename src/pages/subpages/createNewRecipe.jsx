import Breadcrumb from '../../components/breadcrumb';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import { ThemeProvider } from '@emotion/react';
import theme from '../../theme';
import '../../assets/styles/createnewrecipe.css';
// import { useNavigate } from 'react-router-dom';

const Createnewrecipe = () => {
  //   const navigation = useNavigate();
  const parentPage = '/recipes';
  const parentPageName = 'Recipes';
  const currentPageName = 'Create a recipe';

  const handleTitle = (e) => {
    e.preventDefaul();
  };

  const handleDescription = (e) => {
    e.preventDefaul();
  };

  return (
    <div id="container-create-recipe-page">
      <ThemeProvider theme={theme}>
        <div id="container-create-recipe">
          <div id="breadcrumb">
            <Breadcrumb
              parentPageName={parentPageName}
              parentPage={parentPage}
              currentPageName={currentPageName}
            />
          </div>
          <div id="border-create-recipe">
            <div>
              <h2>Create your recipe</h2>
              <p>
                Create a recipe, save it, share it, and take a list of ingredients with you to the
                grocery store!
              </p>
            </div>
            <div>
              {/* <form onSubmit={(e) => addItem(e)}> */}
              <form id="form-create-recipe">
                <Stack spacing={2}>
                  <div>
                    <TextField
                      fullWidth
                      id="title"
                      label="Recipe Title"
                      variant="outlined"
                      onChange={(e) => handleTitle(e)}
                    />
                  </div>
                  <div>
                    <TextField
                      fullWidth
                      id="description"
                      label="Recipe Description"
                      multiline
                      rows={4}
                      variant="outlined"
                      onChange={(e) => handleDescription(e)}
                    />
                  </div>
                  <div id="container-addItem">
                    <TextField
                      fullWidth
                      id="addItemField"
                      label="Add item"
                      variant="outlined"
                      onChange={(e) => handleTitle(e)}
                    />
                    <Button
                      sx={{ width: '6rem' }}
                      variant="outlined"
                      startIcon={<AddIcon />}
                      // onClick={(e) => addItem(e)}
                      type="submit">
                      Add
                    </Button>
                  </div>
                  <Button
                    id="btn-save"
                    sx={{ width: '6rem' }}
                    variant="contained"
                    // startIcon={<AddIcon />}
                    // onClick={(e) => addItem(e)}
                    type="submit">
                    Save
                  </Button>
                </Stack>
              </form>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Createnewrecipe;
