export default class Comments {
  // checkLogin(login) {
  //   if (login.user)
  //     console.log('usuário logado');
  //   else
  //     console.log('não existe usuário logado');
  // };

  getComments(accommodationId) {
    const comments = JSON.parse(localStorage.getItem("comments"));

    if (comments !== null) {
      return comments.filter((item) => item.accommodationId == accommodationId);
    }
  }

  insertComment(comment) {
    const comments = JSON.parse(localStorage.getItem("comments"));
    const newComment = comments ? [...comments] : [];
    newComment.push(comment);

    localStorage.setItem("comments", JSON.stringify([...newComment]));
  }
}
