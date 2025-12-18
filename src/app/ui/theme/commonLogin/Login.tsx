import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Paper, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/useAppDispatch";
import { login, selectAuthError, selectAuthStatus, selectAuthUser } from "../../../features/auth/authSlice";
import { AppButton, AppInput, AppTypography } from "../../components/core";



export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAuthStatus);
  const error = useAppSelector(selectAuthError);
  const user = useAppSelector(selectAuthUser);
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void dispatch(login({ email, password }));
  };

return (
  <Box
     sx={{
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: "background.default",
      px: 2,
    }}

  >
    <Paper
      elevation={4}
      sx={{ width: "100%", maxWidth: 520, p: 5, borderRadius: 3 }}
    >
      <Stack spacing={3}>
        <AppTypography variant="h5" align="center">
          Login
        </AppTypography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            <AppInput
              label="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <AppInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <AppTypography variant="body2" color="error">
                {error}
              </AppTypography>
            )}

            <AppButton
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={status === "loading"}
            >
              {status === "loading" ? "Logging in..." : "Login"}
            </AppButton>
          </Stack>
        </form>
      </Stack>
    </Paper>
  </Box>
);

};
