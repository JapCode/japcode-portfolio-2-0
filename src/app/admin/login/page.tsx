import ContentComponent from '@/components/ContentComponent';
import { LoginForm } from '@/components/loginForm';
import SpotlightCard from '@/components/SpotligCard';
import './modules.css';

const LoginPage = () => {
  return (
    <ContentComponent>
      <div className="container">
        <SpotlightCard>
          <div className="content-box">
            <LoginForm />
          </div>
        </SpotlightCard>
      </div>
    </ContentComponent>
  );
};

export default LoginPage;
