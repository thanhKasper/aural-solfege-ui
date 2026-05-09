import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Input,
  Pagination,
} from "@mui/material";

const ExercisesPage = () => {
  return (
    <Container>
      <Input size="medium" placeholder="search..." fullWidth />
      <Grid container sx={{ paddingTop: 4 }} spacing={4}>
        <Grid size={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Button>New exercise</Button>
        </Grid>
        <Grid size={12}>
          <Grid container spacing={4}>
            <Grid size={4}>
              <Card>
                <CardHeader title={"Exercise title"} />
                <CardContent>Some content inside</CardContent>
              </Card>
            </Grid>
            <Grid size={4}>
              <Card>
                <CardHeader title={"Exercise title"} />
                <CardContent>Some content inside</CardContent>
              </Card>
            </Grid>
            <Grid size={4}>
              <Card>
                <CardHeader title={"Exercise title"} />
                <CardContent>Some content inside</CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid size="grow" sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination count={10} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExercisesPage;
