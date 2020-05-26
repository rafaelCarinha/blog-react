const prod = {
    url: {
        API_URL: "http://completems-env.eba-yd3mcme9.us-east-2.elasticbeanstalk.com"}
    };
const dev = {
    url: {
        API_URL: "http://localhost:8086"
    }
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;