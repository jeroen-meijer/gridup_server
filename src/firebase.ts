import admin from 'firebase-admin';

const serviceAccount = {
  type: 'service_account',
  projectId: 'minsma-gridup',
  privateKeyId: '72dc27069d9efe36e130a41451e40cf019699266',
  privateKey:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDDZx0I0ZGJquru\n48dy30xa8Ri/h0+H7T0dmRKGQe0QA9NiL6XnL/Xq+gMomyKQtP/aC0OHF9+fpqrq\nnb2oootJ/GBfeQLbz7u3QQUTLsY5QCuDSFXouFn2j7EPvgVFq5fyHpa00zuFgL7b\n01a+XuZpOB2sMKp/ADTu4ZRjIAjo1neNYknO3fSdqAJ6iI7vQFuKfrVVy8GUmt69\ni1EscDHvzsHz/fJagimS2TNVXDh82TrOdi1Ou5mbuIlT/GOTu3Ks+4vDEHDrjGjG\nRJDieTQWdlxCUqnEhlS82ea38qofGuVdOqQN1C8SV9YPLSW2EXSuqTF6/EFC0tki\nqfelzNW5AgMBAAECggEAERhEyIA5GM+spQClcs3JSs176kmmshAVwDCjl75NxJBp\nHlZnz7146Lk9rIBB+mHzXjqNClUS2c9FdageLxIlWHAtaDzYfK2EUShtjruRWPHd\nvKsH5Qe3yyPQDD4GDQ3RibuWWLSAKRJV4DpxhM8dnkfsBKPvTpQQjXOLvU5QqTnu\nzFRt+Az/UVvK2id5xpg+VXIfUum2qFcoTf4O4LmNSwM0+RTsoJGR6NnKOOXsP+RF\nu5nWxqCzRq5xeBwa8kJHmts9EGP+SU96vIDdHFCF6+BU2Bnv8gVMBMQbOq1bK9e+\nlXsEhmn7TPSwFyTo16BSu1C2d7guLhcfuazKF7LXQQKBgQDz/qKdiNFPLRf4mTMA\nvYDSMaLOQDSKcLMXwARcZWtE19bpT00z/mLsoPdrertPUiXSP36uUNdHxoc1wC48\nygGWs+rTOnd6cNQeUOc9Vg+JPQDCFDA8G88pIaZoDV7BPBdgOmHQ7WubmcpUJo8X\nbYGxgEDSb6BvOVABZ8b6BkWD8QKBgQDNBGnMRCGGo0H1ekSGT3vwl2pYlS0Oo/J2\n53Q1gdCppaocivoG6ovZjsuE+4G3Xj+DnzdUG2gQOZ9tIxVX3UAPfia25enFav3D\nkm1ZvzIt7HJVPmtLe0BJzx+UxxU49RnIAvZh9u2wpwLvPcl6d+19JEwHPlHj7f5D\nXhTO2luWSQKBgEuEeFhBzGaxEkZDRGHqRUDJVBZ6EMj4cLXdHHxsd3LrSv0TKlX5\nWiza9Tky116JkmMse80AAGGatKaSQL1X2H4IWZne8rPW0BBCAhAd3tkfJGjtTrCL\n+uZEH/j8imNMcf+6kiPUGAYk51Z8SLV7kzSY+XcoTYOfPX/x2sfvwPxBAoGANOVX\nmrFVaRSENx7FwVWOp8OZV6OdjXJ1Y4JSNF/7A1pP6q9c1R382TQDhJsTm8kAYChb\nMSMlFVKYtKLhpdra5WRp/rSRPTNep/AGsKoo+zpPQXkqW75AFwsOnedDrX9nmHhT\nM3FvYC2nDy0E58k7iBcuWowUutczzBPhEIG8MakCgYEA2uAiVQ2YJv6Z/t+EcGrk\nftU2Y9ybN1gNFv6MaoswZko68yFEEgpyzv5p+eI8nC3ADwKVGrW/vvF5B7PaHbBf\nUWF74DbE0tL3248wZg2/oZKMHY+gqWe6RQgmLIuOnPAKHUnVv62fRlHgDtX6dCyh\nnSR/+2Qw4uiH+1Rc4a0tF3c=\n-----END PRIVATE KEY-----\n',
  clientEmail: 'firebase-adminsdk-8fj03@minsma-gridup.iam.gserviceaccount.com',
  clientId: '100403496074247877892',
  authUri: 'https://accounts.google.com/o/oauth2/auth',
  tokenUri: 'https://oauth2.googleapis.com/token',
  authProviderX509CertUrl: 'https://www.googleapis.com/oauth2/v1/certs',
  clientX509CertUrl:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8fj03%40minsma-gridup.iam.gserviceaccount.com'
};

export const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://minsma-gridup.firebaseio.com'
});

export const firestore = firebaseApp.firestore();
